import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
    teamArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    team: {
        padding: 10,
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        alignItems: "center",
        marginVertical: 32,
    },
    form: {
        gap: 12,
    },
    inputInline: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    smallInput: {
        width: 74,
    }
})
