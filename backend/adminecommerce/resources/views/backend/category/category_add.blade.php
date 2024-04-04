@extends('dashboard.admin')
@section('dashboard')

<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">Add Category</h5>
                    </div>

                </div>
                <hr>
                <form method="POST" action="{{ route('category.store') }}" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="categoryName" class="form-label">Category Name:</label>
                        <input type="text" class="form-control" id="categoryName" name="category_name">
                        @error('category_name')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="categoryImage" class="form-label">Category Image:</label>
                        <input type="file" class="form-control" id="categoryImage" name="category_image">
                        <hr>
                    </div>
                    <div class="mb-3">
                        <img id="showImage" src="{{ url('upload/no-pictures.png') }}" style="width: 100px; height: 100px;"/>

                    </div>
                    <button type="submit" class="btn btn-primary">Add Category</button>
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
