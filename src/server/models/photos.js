module.exports = (sequelize, DataTypes) => {
    const Photos = sequelize.define('photos', {
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
        photoTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        displaySequence: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        photoData: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        altCaption: {
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
            singular: 'photo',
            plural: 'photos'
        }
    })
    return Photos
}
