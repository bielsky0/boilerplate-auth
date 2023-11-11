import { Easing } from "framer-motion";




export const transitionHandShakeAnimation1 = {
    ease: 'linear' as Easing,
    duration: 0.2,
};

export const transitionHandShakeAnimation2 = {
    ease: 'linear' as Easing,
    duration: 0.2,
};


export const initialHandShakeAnimation = {
    rotate: '20deg'
}

export const endHandShakeAnimation = {
    rotate: '-15deg'
}

export const transitionArmShakeAnimation1 = {
    ease: 'linear' as Easing,
    duration: 0.3,
}

export const transitionArmShakeAnimation2 = {
    ease: 'linear' as Easing,
    duration: 0.2,
}

export const initialArmShakeAnimation = {
    rotate: '70deg'
}

export const endArmShakeAnimation = {
    rotate: '60deg'
}

export const transitionHandIdleAnimation = {
    ease: 'easeInOut' as Easing,
    repeat: Infinity,
    duration: 4,
};

export const initialHandIdleAnimation = {
    rotate: ['0deg', '9deg', '0deg']
}

export const transitionArmIdleAnimation = {
    ease: 'easeInOut' as Easing,
    repeat: Infinity,
    duration: 4,
}

export const initialArmIdleAnimation = {
    rotate: ['63deg', '60deg', '63deg']
}