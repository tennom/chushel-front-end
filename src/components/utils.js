function validValue(value) {
    switch (value) {
        case null:
            return false;
            break;
        case "":
            return false;
        case -1:
            return false;
        case undefined:
            return false;
        default:
            return true;
            break;
    }
}

export { validValue }