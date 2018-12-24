const ELEMENT_SEPARATOR = '__',
    MODIFIER_SEPARATOR = '--'

function getBEMPath({ b, e, m }) {
    const base = e ? [b, e].join(ELEMENT_SEPARATOR) : b

    return [base, ...m.map(modifier => [base, modifier].join(MODIFIER_SEPARATOR))]
        .join(' ')
        .trim()
}

const b = b => (elementName, modifiers = {}) => {
    let e, m

    if (typeof elementName === 'string') {
        e = elementName
    } else {
        modifiers = elementName || {}
    }

    if (Array.isArray(modifiers)) {
        m = modifiers
    } else {
        m = Object.keys(modifiers).filter(modifier => modifiers[modifier]) || []
    }

    return getBEMPath({ b, e, m })
}

export default b