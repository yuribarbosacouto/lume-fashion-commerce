import { expect, test } from "@playwright/test";

test("principal journey: filter catalog, inspect PDP, add to cart and finish checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Moda pensada para reduzir dúvida antes da compra." })).toBeVisible();

  await page.getByRole("link", { name: "Comprar coleção" }).click();
  await expect(page).toHaveURL(/\/catalogo\/?$/);

  await page.getByRole("checkbox", { name: "Alfaiataria" }).click();
  await expect(page).toHaveURL(/category=Alfaiataria/);
  await expect(page.getByText("Calça alfaiataria cenoura Preta")).toBeVisible();

  await page.getByLabel("Ver produto Calça alfaiataria cenoura Preta").click();
  await expect(page.getByRole("heading", { name: "Calça alfaiataria cenoura Preta" })).toBeVisible();
  await expect(page.getByText("Recomendação pelo perfil preenchido")).toBeVisible();

  await page.getByRole("radio", { name: "M" }).click();
  await page.getByTestId("add-to-cart").click();
  await expect(page.getByRole("status")).toContainText("Produto adicionado");
  await expect(page.getByTestId("cart-count")).toHaveText("1");

  await page.getByRole("button", { name: /Sacola/ }).click();
  await page.getByRole("link", { name: "Ir para checkout" }).click();
  await expect(page.getByRole("heading", { name: "Compra em etapas claras" })).toBeVisible();

  await page.getByLabel("Nome completo").fill("Yuri Barbosa Couto");
  await page.getByLabel("E-mail").fill("yuri@example.com");
  await page.getByTestId("finish-checkout").click();
  await expect(page.getByRole("heading", { name: "Checkout concluído sem pagamento real." })).toBeVisible();
});
