import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categoryList: Category[] = [];
  constructor(
    private categoryService: CategoryService
  ) { }

  async ngOnInit(): Promise<void> {
    this.categoryList = await this.categoryService.getAllCategories();

  }

}
