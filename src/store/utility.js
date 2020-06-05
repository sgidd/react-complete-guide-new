export const updateObject = (oldObject, updatedProprtiesObject) => {
    return {
        ...oldObject,
        ...updatedProprtiesObject
    }
}