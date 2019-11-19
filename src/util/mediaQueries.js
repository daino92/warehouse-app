import facepaint from "facepaint";

const breakpoints = [640, 1025];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const mqCustom = breakpointsCustom => {
    return facepaint(breakpointsCustom.map(bp => `@media (min-width: ${bp}px)`));
};

export default mq;
export {mqCustom};