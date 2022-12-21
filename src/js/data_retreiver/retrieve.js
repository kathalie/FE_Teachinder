import { DataRetriever } from "./data_retriever.js";
function normalize(mainMock, additionalMock, additionalFields, mainSchema, additionalSchema, fieldsToMerge) {
    const dataRetriever = new DataRetriever(mainSchema);
    /** Данні з обєкту random-user-mock привести до вигляду: */
    const retrievedData = dataRetriever.retrieveFrom(mainMock);
    // console.log("Retrieved data:");
    // console.log(retrievedData);
    /** До кожного з об’єктів масиву додати поля: id, favorite, course, bg_color,
     note, заповнюючи їх ПРАВИЛЬНИМ типом данних. */
    dataRetriever.addFieldsToSchema(additionalSchema);
    // console.log("Extended schema");
    // console.log(dataRetriever.schema);
    let extendedUserMock = [...retrievedData];
    extendedUserMock = dataRetriever.extendEach(extendedUserMock, additionalFields);
    // console.log("Extended users with random values of new fields:");
    // console.log(extendedUserMock);
    /** По’єднати два обєкти (random_user_mock та additional_users) в один, позбуваючись повторів */
    dataRetriever.merge(extendedUserMock, additionalMock, fieldsToMerge);
    // console.log("Merged users:");
    // console.log(extendedUserMock);
    return extendedUserMock;
}
//# sourceMappingURL=retrieve.js.map