import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesUploadPage } from './files-upload.page';

describe('FilesUploadPage', () => {
  let component: FilesUploadPage;
  let fixture: ComponentFixture<FilesUploadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
