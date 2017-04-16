import { YamlConfigReader } from 'pip-services-commons-node';
import { AnnouncementsClientFixtureV1 } from './AnnouncementsClientFixtureV1';
import { AnnouncementsLambdaClientV1 } from '../../src/version1/AnnouncementsLambdaClientV1';

suite('AnnouncementsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: AnnouncementsLambdaClientV1;
    let fixture: AnnouncementsClientFixtureV1;

    setup((done) => {
        client = new AnnouncementsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new AnnouncementsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});