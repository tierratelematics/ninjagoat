import IGUIDGenerator from "../../scripts/util/IGUIDGenerator";

class MockGuidGenerator implements IGUIDGenerator {

    generate():string {
        return "42";
    }

}

export default MockGuidGenerator