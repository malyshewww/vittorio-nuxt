import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();
  nuxtApp.provide("toast", {
    showCustomToast: (image, title, volume) => {
      const htmlContent = `
        <div class="app-cart-popup">
            <div class="app-cart-popup__body">
                <div class="app-cart-popup__image">
                    ${image}
                </div>
                <div class="app-cart-popup__content">
                    <div class="app-cart-popup__caption">Добавлен в корзину</div>
                    <p class="toast-text">${title}</p>
                    <p class="toast-text">${volume}</p>
                </div>
            </div>
        </div>
      `;
      toast.open({
        message: htmlContent,
        position: "top-right",
        duration: 5000,
        dangerouslyUseHTMLString: true, // Разрешаем использование HTML
        type: "default", // Отключаем стандартные иконки
      });
    },
  });
});
