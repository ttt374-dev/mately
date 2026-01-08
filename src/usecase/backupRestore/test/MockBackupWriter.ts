export class MockBackupWriter {
  public writtenData?: string;
  public writtenFilename?: string;

  async write(data: string, fileName: string): Promise<void> {
    this.writtenData = data;
    this.writtenFilename = fileName;
  }
}
