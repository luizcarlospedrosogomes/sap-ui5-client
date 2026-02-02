/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import Dialog from "sap/m/Dialog";
import UIEvent from "sap/ui/base/Event";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

import BaseController from "./BaseController";

/**
 * @namespace com.lcpg.sapui5ts.controller
 */
export default class Main extends BaseController {

    private _oEditDialog?: Dialog;

    public sayHello(): void {
        MessageBox.show("Hello World!");
    }

    public async onPressListItem(oEvent: UIEvent): Promise<void> {
        const oItem = oEvent.getParameter("listItem") as ListItemBase;
        const oContext = oItem.getBindingContext("gateway") as Context;
 
        if (!this._oEditDialog) {
            this._oEditDialog = await sap.ui.core.Fragment.load({
                id: this.getView().getId(),
                name: "com.lcpg.sapui5ts.view.fragment.EditSolicitationDialog",
                controller: this
            }) as Dialog;

            this.getView().addDependent(this._oEditDialog);
        }
        this._oEditDialog.setModel(new sap.ui.model.json.JSONModel({}), "modelEditSolicitation");
        this._oEditDialog.setModel(new sap.ui.model.json.JSONModel({ ...oContext.getObject() }), "modelEditSolicitation");
        this._oEditDialog.open();
    }

    public onCancelEdit(): void {
        this._oEditDialog?.close();
    }

    public onSaveSolicitation(): void {
        if (!this._oEditDialog) {
            return;
        }

        const oEditModel = this._oEditDialog.getModel("modelEditSolicitation") as JSONModel;
        const oEditedData = oEditModel.getData() as {
            solicitation_id: string;
            solicitation_description: string;
        };
        console.log(oEditedData);
 
        const oModel = this.getModel("gateway") as ODataModel;
        console.log(oEditedData);
        const oParameters = {
            Data: JSON.stringify([oEditedData]),
            SolicitationId: '',
            Error: '',
            Id: oEditedData.solicitation_id
        }
        oModel.callFunction("/SetSolicitationEdit",
            {
                method: "POST", urlParameters: oParameters,
                success: (oDataResponse: any) => {
                    MessageToast.show(`"Solicitation saved successfully." ${JSON.stringify(oDataResponse)} `);
                    this._oEditDialog?.close();
                    oModel.refresh();
                },
                error: (oError: any) => {
                    MessageBox.error(`"Error saving solicitation." ${JSON.stringify(oError)}`,);
                }
            });
    }
}
