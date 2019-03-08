const getVisibleExpenses = (expenses, { endDate, sortBy, startDate, text }) => {
    return expenses.filter((element) => {
        const endDateFilter = endDate == undefined || element.createdAt <= endDate;
        const startDateFilter = startDate == undefined || element.createdAt >= startDate;
        const textFilter = element.description.toLowerCase().includes(text.toLowerCase());
        return endDateFilter && startDateFilter && textFilter
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
        });
}

export default getVisibleExpenses;