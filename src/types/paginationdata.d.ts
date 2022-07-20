interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

interface Links {
    first: string
    previous: string
    next: string
    last: string
}

export {Meta, Links}
