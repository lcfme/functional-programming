var action = [
    {
		type: 'ADD',
        v: 5
    }
]

action.reduce((status, act)=> {
    if (act.type === 'ADD') {
        return {...status,
                v: status.v + act.v
               }
    }
    return status
}, {
    v: 1,
    a: 100
})
