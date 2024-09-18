import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CouchDBService } from './couchdb.service';

@Controller('couchdb')
export class CouchDBController {
  constructor(private readonly couchDBService: CouchDBService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createDatabase(@Body('dbName') dbName: string) {
    await this.couchDBService.createDatabase(dbName);
    return { message: `Database ${dbName} created successfully` };
  }

  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async saveDocument(@Body() document: any) {
    const result = await this.couchDBService.saveDocument(document);
    return { message: 'Document saved successfully', result };
  }

  @Get('document/:docId')
  @HttpCode(HttpStatus.OK)
  async getDocument(@Param('docId') docId: string) {
    const document = await this.couchDBService.getDocument(docId);
    if (!document) {
      return { message: `Document with ID ${docId} not found` };
    }
    return document;
  }

  @Put('update/:docId')
  @HttpCode(HttpStatus.OK)
  async updateDocument(@Param('docId') docId: string, @Body() document: any) {
    const existingDoc = await this.couchDBService.getDocument(docId);
    if (!existingDoc) {
      return { message: `Document with ID ${docId} not found` };
    }
    const result = await this.couchDBService.updateDocument(docId, document);
    return { message: 'Document updated successfully', result };
  }

  @Delete('delete/:docId')
  @HttpCode(HttpStatus.OK)
  async deleteDocument(@Param('docId') docId: string) {
    const document = await this.couchDBService.getDocument(docId);
    if (!document) {
      return { message: `Document with ID ${docId} not found` };
    }
    await this.couchDBService.deleteDocument(docId, document._rev);
    return { message: 'Document deleted successfully' };
  }
}
