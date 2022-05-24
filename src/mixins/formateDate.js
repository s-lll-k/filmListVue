export default {
    methods: {
        formateDate (incorrectDate, separator, countryFormat) {
            if (!incorrectDate) {
                return;     
            }
            const dateNumbersArr = incorrectDate.split(separator);
            return new Date(...dateNumbersArr).toLocaleString(countryFormat, {
                day: "numeric",
                month: "short",
                year: "numeric"
            });
        }
    }
}