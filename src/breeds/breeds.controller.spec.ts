import { Test, TestingModule } from "@nestjs/testing";

import { BreedsController } from "./breeds.controller";
import { BreedsService } from "./breeds.service";

describe("BreedsController", () => {
  let controller: BreedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedsController],
      providers: [BreedsService],
    }).compile();

    controller = module.get<BreedsController>(BreedsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
