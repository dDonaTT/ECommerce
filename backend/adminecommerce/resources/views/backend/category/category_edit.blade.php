@extends('dashboard.admin')
@section('dashboard')

<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">Edit Category</h5>
                    </div>

                </div>
                <hr>
                <form method="POST" action="{{ route('category.update') }}" enctype="multipart/form-data">
                    @csrf

                    <input type="hidden" name="id" value="{{ $category->id }}">

                    <div class="mb-3">
                        <label for="categoryName" class="form-label">Category Name:</label>
                        <input type="text" class="form-control" id="categoryName" name="category_name" value="{{ $category->category_name }}">
                        @if($errors->has('category_name') && $errors->first('category_name') === "Category name is required")
                            <span class="text-danger">Category name cannot be null.</span>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="categoryImage" class="form-label">Category Image:</label>
                        <input type="file" class="form-control" id="categoryImage" name="category_image">
                        <!-- Display error message if category image is null -->
                        @if($errors->has('category_image') && $errors->first('category_image') === "Category image is required")
                            <span class="text-danger">Category image cannot be null.</span>
                        @enderror
                        <hr>
                    </div>
                    <div class="mb-3">
                        <img id="showImage" src="{{ asset($category->category_image) }}" style="width: 100px; height: 100px;"/>

                    </div>
                    <button type="submit" class="btn btn-primary">Update Category</button>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $('#categoryImage').change(function(e){
            var reader = new FileReader();
            reader.onload = function(e){
                $('#showImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files['0']);
        });
    });
</script>

@endsection
