import { sequelize } from "../database";
import { DataTypes } from "sequelize";


const ProtocolActionProperties = sequelize.define('ProtocolActionProperties', {

    name: { type: DataTypes.STRING(45) },
    actionType: { type: DataTypes.INTEGER },
    optionsJSON: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    required: { type: DataTypes.BOOLEAN }


}, { tableName: "ProtocolActionProperties" });


const ProtocolActions = sequelize.define('ProtocolActions', {

    name: { type: DataTypes.STRING(45) },
    description: { type: DataTypes.STRING(45) },
    icon: { type: DataTypes.STRING(500) },

}, { tableName: "ProtocolActions" });

//@ts-ignore
ProtocolActions.actionProperties = ProtocolActionProperties.belongsTo(ProtocolActionProperties, { foreignKey: "actionId" });

const Protocols = sequelize.define('Protocols', {

    name: { type: DataTypes.STRING(45) },
    website: { type: DataTypes.STRING(45) },
    toolbarImageURL: { type: DataTypes.STRING(500) },
    showOnToolbar: { type: DataTypes.STRING(45) },
    edgeColor: { type: DataTypes.STRING(45) },
    description: { type: DataTypes.TEXT },
    vertexImageURL: { type: DataTypes.STRING(500) },
    mediumImageURL: { type: DataTypes.STRING(500) },


}, { tableName: "Protocols" });

//@ts-ignore
Protocols.ProtocolActions = ProtocolActions.belongsTo(ProtocolActions, { foreignKey: "protocolId" });


export { Protocols, ProtocolActions, ProtocolActionProperties }