
package nbe341team10.coffeeproject.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import nbe341team10.coffeeproject.domain.admin.controller.ApiV1AdminController; // Import your controller
import nbe341team10.coffeeproject.domain.admin.controller.ApiV1AdminController.ProductAddRequest;
import nbe341team10.coffeeproject.domain.product.entity.Product;
import nbe341team10.coffeeproject.domain.product.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
@SpringBootTest
class ApiV1AdminControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("상품 추가 성공 확인")
    @WithMockUser(roles = "ADMIN")
    void addProductSuccess() throws Exception {
        // 1. Create ProductGetItemDto for request body
        ProductAddRequest request = new ProductAddRequest("Test Product", "Test Description", 1000, "test.jpg", 50);

        // 2. Convert ProductGetItemDto to JSON
        String json = objectMapper.writeValueAsString(request);

        // 3. Perform POST request and verify response
        mvc.perform(post("/api/v1/admin/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.msg").value("상품 등록 성공"))
                .andExpect(jsonPath("$.data.name").value("Test Product"))
                .andExpect(jsonPath("$.data.description").value("Test Description"))
                .andExpect(jsonPath("$.data.price").value(1000))
                .andExpect(jsonPath("$.data.imageUrl").value("test.jpg"))
                .andExpect(jsonPath("$.data.stockQuantity").value(50))
                .andExpect(handler().handlerType(ApiV1AdminController.class));

        Product product = productService.getItems().stream()
                .filter(p -> p.getName().equals("Test Product"))
                .findFirst()
                .orElse(null);

        assertEquals("Test Product", product.getName());
        assertEquals("Test Description", product.getDescription());
        assertEquals(1000, product.getPrice());
        assertEquals("test.jpg", product.getImageUrl());
        assertEquals(50, product.getStockQuantity());
    }

    @Test
    @DisplayName("상품 삭제 성공 확인")
    @WithMockUser(roles = "ADMIN")
    void deleteProductSuccess() throws Exception {
        // 1. 기존 상품 조회 (이름으로 조회)
        Product product = productService.getItems().stream()
                .filter(p -> p.getName().equals("에티오피아 예가체프"))
                .findFirst().orElseThrow(() -> new AssertionError("Product not found"));

        Long productId = product.getId();

        // 2. 상품 삭제 및 ResultActions 획득
        ResultActions resultActions = mvc.perform(delete("/api/v1/admin/product/" + productId))
                .andDo(print());

        // 3. 삭제 성공 응답 확인
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.msg").value("상품 삭제 성공"))
                .andExpect(handler().handlerType(ApiV1AdminController.class));
    }

    @Test
    @DisplayName("상품 삭제 실패 - 상품 없음")
    @WithMockUser(roles = "ADMIN")
    void deleteProductNotFound() throws Exception {
        Long nonExistentProductId = 99999L;

        ResultActions resultActions = mvc.perform(delete("/api/v1/admin/product/" + nonExistentProductId))
                .andDo(print());

        resultActions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("404"))
                .andExpect(jsonPath("$.msg").value("Product not found with id: " + nonExistentProductId));
    }

    @Test
    @DisplayName("상품 수정 성공 확인")
    @WithMockUser(roles = "ADMIN")
    void modifyProductSuccess_JsonString() throws Exception {
        // 1. 수정할 상품 조회
        Product product = productService.getItems().stream()
                .filter(p -> p.getName().equals("에티오피아 예가체프"))
                .findFirst().orElseThrow(() -> new AssertionError("Product not found"));

        Long productId = product.getId();

        // 2. JSON 문자열 직접 작성
        String json = """
        {
            "name": "수정된 이름",
            "description": "수정된 설명",
            "price": 20000,
            "imageUrl": "수정된.jpg",
            "stockQuantity": 60
        }
        """;

        // 3. 수정 요청
        ResultActions resultActions = mvc.perform(put("/api/v1/admin/product/" + productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andDo(print());

        // 4. 응답 확인
        resultActions
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1AdminController.class))
                .andExpect(handler().methodName("modifyProduct"))
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.msg").value("상품 수정 성공"))
                .andExpect(jsonPath("$.data.name").value("수정된 이름"))
                .andExpect(jsonPath("$.data.description").value("수정된 설명"))
                .andExpect(jsonPath("$.data.price").value(20000))
                .andExpect(jsonPath("$.data.imageUrl").value("수정된.jpg"))
                .andExpect(jsonPath("$.data.stockQuantity").value(60));


        Product modifiedProduct = productService.getItem(productId).orElseThrow(() -> new AssertionError("Product not found"));

        assertEquals("수정된 이름", modifiedProduct.getName());
        assertEquals("수정된 설명", modifiedProduct.getDescription());
        assertEquals(20000, modifiedProduct.getPrice());
        assertEquals("수정된.jpg", modifiedProduct.getImageUrl());
        assertEquals(60, modifiedProduct.getStockQuantity());
    }
}