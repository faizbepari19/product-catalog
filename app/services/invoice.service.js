class InvoiceCalculator {
    constructor(products, shippingRate, specialOffers, taxation) {
        this.products = products;
        this.shippingRate = shippingRate;
        this.specialOffers = specialOffers;
        this.taxation = taxation;
    }

    calculateSubtotal() {

        return this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    }

    calculateShippingFees() {

        const totalWeight = this.products.reduce((sum, product) => sum + product.weight  * product.quantity, 0);
        
        return (totalWeight / 100) * this.shippingRate.rate;

    }

    applyDiscount() {
        // Assume that only one offer is applicable at a time

        const applicableOffer = this.specialOffers.find(offer => this.isOfferApplicable(offer));

        if (applicableOffer) {
            let percent = (applicableOffer.discount_percentage / 100);
            let offeredAmt = this.calculateSubtotal()

            return percent * offeredAmt;
        }

        return 0;
    }

    isOfferApplicable(offer) {
        if (!offer.minimum_quantity || this.products.length < offer.minimum_quantity) {
            return false;
        }
    
        if (offer.product_type) {
            const offerProducts = this.products.filter(product => product.type === offer.product_type);
            return offerProducts.length >= offer.minimum_quantity;
        }
    
        return true;

    }

    calculateTax() {
        return (this.calculateSubtotal() - this.applyDiscount() + this.calculateShippingFees()) * (this.taxation.tax_percentage / 100);
    }

    calculateTotal() {
        return this.calculateSubtotal() - this.applyDiscount() + this.calculateShippingFees() + this.calculateTax();
    }

    generateInvoice() {
        return {
            subtotal: this.calculateSubtotal(),
            shippingFees: this.calculateShippingFees(),
            discount: this.applyDiscount(),
            tax: this.calculateTax(),
            total: this.calculateTotal(),
        };
    }
}

module.exports = InvoiceCalculator;