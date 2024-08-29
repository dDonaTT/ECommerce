@extends('dashboard.admin')
@section('dashboard')

<div class="page-wrapper">
    <div class="page-content">
        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">All Products</h5>
                    </div>
                    <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i></div>
                </div>
                <hr>
                <form action="{{ route('all.product') }}" method="GET" class="mb-3">
                    <div class="input-group">
                        <input type="text" name="search" class="form-control"
                            placeholder="Search by Product Name, Code, or Category" value="{{ request('search') }}">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </form>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Number</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Product Code</th>
                                <th>Product Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php($i = 1)
                            @foreach($products as $item)
                                <tr>
                                    <td>{{ $i++ }}</td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="recent-product-img">
                                                <img src="{{ $item->image }}" alt="" style="width: 50px; height: 50px;">
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ $item->title }}</td>
                                    <td>{{ $item->product_code }}</td>
                                    <td>{{ $item->category }}</td>
                                    <td>
                                        <a href="{{ route('product.edit', $item->id) }}" class="btn btn-info">Edit</a>
                                        <a href="{{ route('product.delete', $item->id) }}" class="btn btn-danger"
                                            id="delete">Delete</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {{ $products->links() }}

    </div>
</div>

@if(Session::has('success'))
    <script>
        toastr.success('{{ Session::get('success') }}');
    </script>
@endif

@endsection
