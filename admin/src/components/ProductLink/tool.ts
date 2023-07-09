import { API } from "@editorjs/editorjs";

export type ProductLinkData = {
  id?: string;
};

type ProductData = {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
};

export class ProductLinkTool {
  api: API;
  data: ProductLinkData;

  static get toolbox() {
    return {
      title: "商品リンク",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M48.07,96a8,8,0,0,1-7.89-9.72C46.68,55.55,83.52,32,128,32s81.32,23.55,87.82,54.28A8,8,0,0,1,207.93,96Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="24 176 68 160 108 176 148 160 188 176 232 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="24" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M208,168.73V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V167.27" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
    };
  }

  constructor({
    api,
    data,
  }: {
    api: API;
    data: ProductLinkData;
  }) {
    this.api = api
    this.data = data;
  }

  render() {
    const block = document.createElement("div");
    block.style.border = "1px solid #ddd";
    block.style.padding = "12px";
    block.style.borderRadius = "4px";

    const productBlock = document.createElement("div");
    const productImage = document.createElement("img");
    const productInfo = document.createElement("div");
    const productTitle = document.createElement("div");
    const productDescription = document.createElement("div");
    productBlock.style.display = "flex";
    productBlock.style.gap = "12px";
    productImage.style.width = "50%";
    productImage.style.objectFit = "cover";
    productImage.style.borderRadius = "4px";
    productTitle.style.fontWeight = "bold";
    productDescription.style.color = "#666";
    productDescription.style.fontSize = "14px";
    productDescription.style.marginTop = "12px";
    productBlock.appendChild(productImage);
    productBlock.appendChild(productInfo);
    productInfo.appendChild(productTitle);
    productInfo.appendChild(productDescription);

    const idLabel = document.createElement("label");
    idLabel.textContent = "商品ID";
    idLabel.style.display = "block";
    idLabel.style.marginBottom = "8px";
    idLabel.style.fontSize = "12px";
    idLabel.style.fontWeight = "bold";
    block.appendChild(idLabel);

    const idInput = document.createElement("input");
    idInput.setAttribute("id", "id");
    idInput.setAttribute("placeholder", "商品IDを入力してください");
    idInput.classList.add("cdx-input");
    idInput.value = this.data.id || "";
    idInput.addEventListener("change", async () => {
      if (idInput.value) {
        const product = await this.findProduct(idInput.value);
        productImage.setAttribute("src", product.image.url);
        productTitle.textContent = product.title;
        productDescription.textContent = product.description;
      }
    });
    block.appendChild(idInput);
    block.dispatchEvent(new Event("change"));

    const productLabel = document.createElement("label");
    productLabel.textContent = "商品情報";
    productLabel.style.display = "block";
    productLabel.style.marginTop = "12px";
    productLabel.style.marginBottom = "8px";
    productLabel.style.fontSize = "12px";
    productLabel.style.fontWeight = "bold";
    block.appendChild(productLabel);
    block.appendChild(productBlock);

    return block;
  }

  save(block: HTMLDivElement): ProductLinkData {
    return {
      id: block.querySelector<HTMLInputElement>("#id")?.value,
    }
  }

  async findProduct(id: string): Promise<ProductData> {
    const response = await fetch(`/api/editorjs/products/${id}`);
    const { product } = await response.json();
    console.log('data', product);
    return product;
  }
}
