import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Nano from 'nano';

@Injectable()
export class CouchDBService {
  private readonly nano: Nano.ServerScope;
  private readonly dbName: string;

  constructor() {
    this.nano = Nano({
      url: 'http://localhost:5984',
      requestDefaults: {
        auth: {
          username: 'admin',
          password: 'password',
        },
      },
    });
    this.dbName = 'clima_monitor';
  }

  private getDb() {
    return this.nano.db.use(this.dbName);
  }

  async createDatabase(dbName: string): Promise<void> {
    try {
      await this.nano.db.create(dbName);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating database: ' + error.message
      );
    }
  }

  async getDocument(docId: string) {
    try {
      return await this.getDb().get(docId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching document: ' + error.message
      );
    }
  }

  async saveDocument(doc: any) {
    try {
      return await this.getDb().insert(doc);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error saving document: ' + error.message
      );
    }
  }

  async updateDocument(docId: string, doc: any) {
    try {
      return await this.getDb().insert(doc, docId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating document: ' + error.message
      );
    }
  }

  async deleteDocument(docId: string, rev: string) {
    try {
      return await this.getDb().destroy(docId, rev);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting document: ' + error.message
      );
    }
  }
}
