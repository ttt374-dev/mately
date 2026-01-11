import { GenericListMenu } from '@/ui/sharedComponents/GenericListMenu';

type Props = {
    onDeleteProblem: () => void
    onDetailDialogOpen: () => void
}
export default function PlayerListMenu({
    onDetailDialogOpen
}: Props
) {

    const menuItems = [
        { 
            key: "detailDialog",
            label: "詳細・編集",
            onClick: () => {onDetailDialogOpen()}
        }
    ]
    return (<GenericListMenu menuItems={menuItems}/>)
    

}