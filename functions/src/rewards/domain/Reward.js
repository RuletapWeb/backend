class Reward {
    constructor(userId, brandId, createdAt, expiresAt, promo) {
        this.userId = userId; //obtener del body
        this.brandId = brandId; //obtener Random!
        this.createdAt = createdAt; //fecha creacion
        this.expiresAt = expiresAt; //definir vencimiento
        this.promo = promo; //obtener Random!
    }

}

module.exports = {
    Reward
}