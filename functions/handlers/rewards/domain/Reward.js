class Reward {
    constructor(userId, brandId, createdAt, expiresAt, cupon) {
        this.userId = userId; //obtener del body
        this.brandId = brandId; //obtener Random!
        this.createdAt = createdAt; //fecha creacion
        this.expiresAt = expiresAt; //definir vencimiento
        this.cupon = cupon; //obtener Random!
    }

}

module.exports = {
    Reward
}