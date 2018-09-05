import { FeatureBModule } from './feature-b.module';

describe('FeatureBModule', () => {
  let featureBModule: FeatureBModule;

  beforeEach(() => {
    featureBModule = new FeatureBModule();
  });

  it('should create an instance', () => {
    expect(featureBModule).toBeTruthy();
  });
});
