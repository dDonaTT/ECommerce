@extends('dashboard.admin')
@section('dashboard')

<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">Update Slider</h5>
                    </div>

                </div>
                <hr>
                <form method="POST" action="{{ route('slider.update', ['id' => $slider->id]) }}" enctype="multipart/form-data">
                    @csrf

                    <input type="hidden" name="id" value="{{ $slider->id }}">

                    <div class="mb-3">
                        <label for="categoryImage" class="form-label">Slider Image:</label>
                        <input type="file" class="form-control" id="categoryImage" name="slider_image">
                        <!-- Display error message if category image is null -->
                        @if($errors->has('slider_image') && $errors->first('slider_image') === "Category image is required")
                            <span class="text-danger">Slider image cannot be null.</span>
                        @enderror
                        <hr>
                    </div>
                    <div class="mb-3">
                        <img id="showImage" src="{{ asset($slider->slider_image) }}" style="width: 100px; height: 100px;"/>

                    </div>
                    <button type="submit" class="btn btn-primary">Update Slider</button>
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
