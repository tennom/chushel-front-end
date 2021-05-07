export default {
    table: {
        tableWrapper: '',
        tableHeaderClass: '',
        tableBodyClass: '',
        tableClass: 'w3-table-all table-top-border',
        loadingClass: 'fa fa-spinner fa-spin',
        ascendingIcon: 'fa fa-chevron-up',
        descendingIcon: 'fa fa-chevron-down',
        ascendingClass: 'sorted-asc',
        descendingClass: 'sorted-desc',
        sortableIcon: 'fa fa-sort',
        detailRowClass: 'vuetable-detail-row',
        handleIcon: 'fa fa-bars text-secondary',
        renderIcon(classes, options) {
            return `<i class="${classes.join(' ')}"></span>`
        }
    },
    pagination: {
        wrapperClass: 'w3-cell w3-border w3-right',
        activeClass: 'emerald',
        disabledClass: 'disabled-item',
        pageClass: 'w3-bar-item w3-button w3-round',
        linkClass: 'w3-bar-item w3-button',
        paginationClass: '',
        paginationInfoClass: '',
        dropdownClass: 'form-control',
        icons: {
            first: 'fa fa-fast-backward',
            prev: 'fa fa-step-backward',
            next: 'fa fa-step-forward',
            last: 'fa fa-fast-forward',
        }

    },
    paginationInfo: {
        infoClass: 'w3-cell w3-left w3-padding',

    }
}