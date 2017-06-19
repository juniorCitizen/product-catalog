module.exports = (sequelize, DataTypes) => {
    const Descriptions = sequelize.define('descriptions', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: { isUUID: 4 }
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: { isUUID: 4 }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        name: {
            singular: 'description',
            plural: 'descriptions'
        }
    })
    return Descriptions
}
