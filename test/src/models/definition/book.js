/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => sequelize.define('Book', {
    automobileLiabilityInsuranceCode: {
        type: DataTypes.INTEGER,
        field: 'automobile_liability_insurance_code',
        allowNull: false,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING(200),
        field: 'category',
        allowNull: true
    },
    contract1month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_1month',
        allowNull: true
    },
    contract2month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_2month',
        allowNull: true
    },
    contract3month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_3month',
        allowNull: true
    },
    contract4month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_4month',
        allowNull: true
    },
    contract5month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_5month',
        allowNull: true
    },
    contract6month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_6month',
        allowNull: true
    },
    contract7month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_7month',
        allowNull: true
    },
    contract8month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_8month',
        allowNull: true
    },
    contract9month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_9month',
        allowNull: true
    },
    contract10month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_10month',
        allowNull: true
    },
    contract11month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_11month',
        allowNull: true
    },
    contract12month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_12month',
        allowNull: true
    },
    contract13month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_13month',
        allowNull: true
    },
    contract14month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_14month',
        allowNull: true
    },
    contract15month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_15month',
        allowNull: true
    },
    contract16month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_16month',
        allowNull: true
    },
    contract17month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_17month',
        allowNull: true
    },
    contract18month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_18month',
        allowNull: true
    },
    contract19month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_19month',
        allowNull: true
    },
    contract20month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_20month',
        allowNull: true
    },
    contract21month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_21month',
        allowNull: true
    },
    contract22month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_22month',
        allowNull: true
    },
    contract23month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_23month',
        allowNull: true
    },
    contract24month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_24month',
        allowNull: true
    },
    contract25month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_25month',
        allowNull: true
    },
    contract26month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_26month',
        allowNull: true
    },
    contract27month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_27month',
        allowNull: true
    },
    contract28month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_28month',
        allowNull: true
    },
    contract29month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_29month',
        allowNull: true
    },
    contract30month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_30month',
        allowNull: true
    },
    contract31month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_31month',
        allowNull: true
    },
    contract32month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_32month',
        allowNull: true
    },
    contract33month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_33month',
        allowNull: true
    },
    contract34month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_34month',
        allowNull: true
    },
    contract35month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_35month',
        allowNull: true
    },
    contract36month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_36month',
        allowNull: true
    },
    contract37month: {
        type: DataTypes.DECIMAL(10),
        field: 'contract_37month',
        allowNull: true
    },
    createDate: {
        type: DataTypes.DATE,
        field: 'create_date',
        allowNull: true
    },
    updateDate: {
        type: DataTypes.DATE,
        field: 'update_date',
        allowNull: true
    },
    disableDate: {
        type: DataTypes.DATE,
        field: 'disable_date',
        allowNull: true,
        defaultValue: "infinity"
    }
}, {
    schema: 'public',
    tableName: 'hoyu_automobile_liability_insurance',
    timestamps: false
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
