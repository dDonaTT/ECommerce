@extends('dashboard.admin')
@section('dashboard')

<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">All SubCategories</h5>
                    </div>
                    <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i></div>
                </div>
                <hr>
                <form action="{{ route('all.subcategory') }}" method="GET" class="mb-3">
                    <div class="input-group">
                        <input type="text" name="search" class="form-control" placeholder="Search by Category or SubCategory Name" value="{{ request('search') }}">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </form>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>SL</th>
                                <th>Category Name</th>
                                <th>SubCategory Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php($i = 1)
                            @foreach($sub_categories as $item)
                            <tr>
                                <td>{{ $i++ }}</td>
                                <td>{{ $item->category_name }}</td>
                                <td>{{ $item->subcategory_name }}</td>
                                <td>
                                    <a href="{{ route('subcategory.edit', $item->id) }}" class="btn btn-info">Edit</a>
                                    <a href="{{ route('subcategory.delete', $item->id) }}" class="btn btn-danger" id="delete">Delete</a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@if(Session::has('success'))
<script>
    toastr.success('{{ Session::get('success') }}');
</script>
@endif

@endsection
