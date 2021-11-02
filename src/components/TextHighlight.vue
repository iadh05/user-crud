<template>
    <span v-html="parsedText" class="text-highlight"></span>
</template>

<script>
export default {
    name: "TextHighlight",
    props: ["text", "search"],
    computed: {
        parsedText() {
            if (!this.search || !this.text) return this.text;
            const text = this.text.toString();

            const regex = new RegExp(this.search, "gi");
            const found = text.match(regex);
            if (!found) return text;
            const arr = text.split(regex);
            let result = "";
            for (const [index, item] of arr.entries()) {
                result +=
                    item +
                    (found[index] ? `<strong>${found[index]}</strong>` : "");
            }
            return result;
        },
    },
};
</script>

<style lang="scss">
.text-highlight {
    strong {
        font-weight: 900;
    }
}
</style>
