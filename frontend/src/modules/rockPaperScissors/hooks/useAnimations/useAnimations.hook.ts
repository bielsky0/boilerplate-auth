import { useAnimate } from "framer-motion";
import {
    initialHandIdleAnimation, transitionHandIdleAnimation, initialArmIdleAnimation, transitionArmIdleAnimation,
    initialHandShakeAnimation, transitionHandShakeAnimation1, endHandShakeAnimation, transitionHandShakeAnimation2,
    initialArmShakeAnimation, transitionArmShakeAnimation1, endArmShakeAnimation, transitionArmShakeAnimation2
} from "./consts";
import { useState } from "react";

export const useAnimations = () => {
    const [armRef, animateArm] = useAnimate();
    const [handRef, animateHand] = useAnimate();

    const [isShakeAnimation, setIsShakeAnimation] = useState(false);

    function idleHandAnimation() {
        animateHand(
            handRef.current,
            initialHandIdleAnimation,
            transitionHandIdleAnimation
        );
    }

    function idleArmAnimation() {
        animateArm(
            armRef.current,
            initialArmIdleAnimation,
            transitionArmIdleAnimation
        );
    }

    async function shakeHandAnimation() {
        setIsShakeAnimation(true);
        await animateHand(
            handRef.current,
            initialHandShakeAnimation,
            transitionHandShakeAnimation1
        );
        await animateHand(
            handRef.current,
            endHandShakeAnimation,
            transitionHandShakeAnimation2
        );
        await animateHand(
            handRef.current,
            initialHandShakeAnimation,
            transitionHandShakeAnimation2
        );
        await animateHand(
            handRef.current,
            endHandShakeAnimation,
            transitionHandShakeAnimation2
        );
        await animateHand(
            handRef.current,
            initialHandShakeAnimation,
            transitionHandShakeAnimation2
        );
        await animateHand(
            handRef.current,
            endHandShakeAnimation,
            transitionHandShakeAnimation1
        );
        setIsShakeAnimation(false);
    }

    async function shakeArmAnimation() {
        await animateArm(
            armRef.current,
            initialArmShakeAnimation,
            transitionArmShakeAnimation1
        );
        await animateArm(
            armRef.current,
            endArmShakeAnimation,
            transitionArmShakeAnimation2
        );
        await animateArm(
            armRef.current,
            initialArmShakeAnimation,
            transitionArmShakeAnimation2
        );
        await animateArm(
            armRef.current,
            endArmShakeAnimation,
            transitionArmShakeAnimation2
        );
        await animateArm(
            armRef.current,
            initialArmShakeAnimation,
            transitionArmShakeAnimation2
        );
        await animateArm(
            armRef.current,
            endArmShakeAnimation,
            transitionArmShakeAnimation1
        );
    }

    async function shakeAnimation() {
        return Promise.allSettled([shakeHandAnimation(), shakeArmAnimation()])
    }

    async function idleAnimation() {
        return Promise.allSettled([idleArmAnimation(), idleHandAnimation()])
    }

    return { shakeAnimation, handRef, armRef, idleAnimation, isShakeAnimation }
}