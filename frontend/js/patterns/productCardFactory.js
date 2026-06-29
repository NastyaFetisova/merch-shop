class ProductCardFactory {
    static create(product, template) {

        const clone = template.content.cloneNode(true);

        clone.querySelector('.card__photo img').src = product.image_url;
        clone.querySelector('.card__name').textContent = product.name;
        clone.querySelector('.card__price').textContent = product.price + ' ₽';
        clone.querySelector('.card').dataset.id = product.id;

        return clone;
    }

    static createMany(products, template) {
        const fragment = document.createDocumentFragment();

        products.forEach(product => {
            const card = this.create(product, template);
            fragment.appendChild(card);
        });
        return fragment;
    }
}

export default ProductCardFactory;