export default function mapFields(fields, getter, action) {
    const computed = {};
    for (const field of fields) {
        computed[field] = {
            get() {
                return this.$store.getters[getter]({ field });
            },
            set(value) {
                this.$store.dispatch(action, { field, value });
            },
        };
    }
    return computed;
}
