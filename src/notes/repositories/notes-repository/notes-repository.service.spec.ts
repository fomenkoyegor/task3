import { Test, TestingModule } from '@nestjs/testing';
import { NotesRepositoryService } from './notes-repository.service';

describe('NotesRepositoryService', () => {
  let service: NotesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesRepositoryService],
    }).compile();

    service = module.get<NotesRepositoryService>(NotesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
