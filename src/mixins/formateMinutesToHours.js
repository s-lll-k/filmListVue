export default {
    methods: {
        formateMinutesToHours(minutes) {
            if (!minutes) {
                return;
            }
            const hours = Math.floor(minutes / 60),
                remainder = minutes % 60;

            return !hours ? `${remainder} мин` : !remainder ? `${hours} ч` : `${hours} ч ${remainder} мин`;
        }
    }
};
