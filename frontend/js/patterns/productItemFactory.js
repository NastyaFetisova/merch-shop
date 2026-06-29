class ProductItemFactory {
    static create(product, templates) {

        const clone = templates.content.cloneNode(true);

        clone.querySelector('.cart-item__img img').src = product.productPhoto;
        clone.querySelector('.cart-item__name').textContent = product.name;
        clone.querySelector('.cart-item__size').textContent = `Размер: (${product.size})`;
        clone.querySelector('.cart-item__quantity').textContent = `Количество: ${product.quantity} шт`;
        clone.querySelector('.cart-item__price').textContent = product.total + ' ₽';
        clone.querySelector('.cart-item').dataset.price = product.total;
        clone.querySelector('.cart-item').dataset.productId = product.productId;
        clone.querySelector('.cart-item').dataset.productSizeId = product.productSizeId;

        return clone;

    }

    static createMany(products, templates) {

        const fragment = document.createDocumentFragment();
        products.forEach(product => {
            const elm = this.create(product, templates);
            fragment.appendChild(elm);
        });
        return fragment;
    }
}

export default ProductItemFactory;