import { Menu, MenuItem } from "electron"

const menu = new Menu()

initMenu = () => {
    menu.append(new MenuItem({
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click: () => { console.log('dd') }
    }))

}

export default initMenu
