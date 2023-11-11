import { useContext } from "react"
import { InGameContext } from "../../store/inGame/inGame.provider"
import { Pick } from "../../store";
import { InGameAction } from "../../store/inGame/inGame.types";

export const useInGame = () => {
    const context = useContext(InGameContext);

    if (!context) throw Error('InGameContext used outside the provider');

    const {
        state: { prePick },
        dispatch
    } = context

    const makePrePick = (prePick: Pick | null) => {
        dispatch({
            type: InGameAction.MAKE_PRE_PICK, payload: {
                prePick
            }
        })
    }

    return { makePrePick, prePick }
}