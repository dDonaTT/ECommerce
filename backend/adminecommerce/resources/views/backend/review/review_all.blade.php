@extends('dashboard.admin')
@section('dashboard')
<div class="page-wrapper">
    <div class="page-content">

        <div class="card radius-10">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0">All Reviews</h5>
                    </div>
                    <div class="font-22 ms-auto">
                        <i class="bx bx-dots-horizontal-rounded"></i>
                    </div>
                </div>
                <hr>

                <!-- Search Form -->
                <form action="{{ route('all.review') }}" method="GET">
                    <div class="input-group mb-3">
                        <input type="text" name="search" class="form-control" placeholder="Search reviews..."
                            value="{{ request()->input('search') }}">
                        <button class="btn btn-primary" type="submit">Search</button>
                    </div>
                </form>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>SL</th>
                                <th>Product Name</th>
                                <th>Reviewer Name</th>
                                <th>Rating</th>
                                <th>Comments</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php($i = 1)
                            @foreach($reviews as $item)
                                <tr>
                                    <td>{{ $i++ }}</td>
                                    <td>{{ $item->product_name }}</td>
                                    <td>{{ $item->reviewer_name }}</td>
                                    <td>{{ $item->reviewer_rating }}</td>
                                    <td>{{ $item->reviewer_comments }}</td>
                                    <td>
                                        <a href="{{ route('review.delete', $item->id) }}" class="btn btn-danger"
                                            id="delete">Delete</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <!-- Pagination Links -->
                <div class="mt-3">
                    {{ $reviews->links() }}
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
