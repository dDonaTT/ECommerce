<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+15+Charted&family=Lilita+One&family=Permanent+Marker&display=swap" rel="stylesheet">

    <style>
        .lilita-one-regular {
        font-family: "Lilita One", sans-serif;
        font-weight: 400;
        font-style: normal;
        }
    </style>
</head>
<body>
    <div class="sidebar-wrapper" data-simplebar="true">
			<div class="sidebar-header">
				<div>
					<img src="{{ asset('admin/assets/images/flash-card.png') }}" class="logo-icon" alt="logo icon">
				</div>
				<div>
					<a href='http://localhost:3000/' class="logo-text lilita-one-regular"
                    style="color: #F29F38;">Snap Buy</a>
				</div>
				<div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left' style="color: #F29F38;"></i>
				</div>
			</div>
			<!--navigation-->
			<ul class="metismenu" id="menu">

				<li>
					<a href="{{ route('dashboard')}}">
						<div class="parent-icon"><i class='bx bx-home-circle'></i>
						</div>
						<div class="menu-title">Dashboard</div>
					</a>
				</li>



				<li class="menu-label">UI Elements</li>

				<li>
					<a href="javascript:;" class="has-arrow">
						<div class="parent-icon"><i class='bx bx-user'></i>
						</div>
						<div class="menu-title">User</div>
					</a>
					<ul>
						<li> <a href="{{ route('all.user')}}"><i class="bx bx-right-arrow-alt"></i>All User</a>
						</li>
						<li> <a href="{{ route('add.user')}}"><i class="bx bx-right-arrow-alt"></i>Add User</a>
						</li>
					</ul>
				</li>

				<li>
					<a href="javascript:;" class="has-arrow">
						<div class="parent-icon"><i class='bx bx-category'></i></i>
						</div>
						<div class="menu-title">Category</div>
					</a>
					<ul>
						<li> <a href="{{ route('all.category')}}"><i class="bx bx-right-arrow-alt"></i>All Category</a>
						</li>
						<li> <a href="{{ route('add.category')}}"><i class="bx bx-right-arrow-alt"></i>Add Category</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="has-arrow" href="javascript:;">
						<div class="parent-icon"><i class='bx bx-tag'></i>
						</div>
						<div class="menu-title">Sub Category</div>
					</a>
					<ul>
						<li> <a href="{{route('all.subcategory')}}"><i class="bx bx-right-arrow-alt"></i>All SubCategory</a>
						</li>
						<li> <a href="{{route('add.subcategory')}}"><i class="bx bx-right-arrow-alt"></i>Add SubCategory</a>
						</li>

					</ul>
				</li>

                <li>
					<a class="has-arrow" href="javascript:;">
						<div class="parent-icon"><i class='bx bx-box'></i>
						</div>
						<div class="menu-title">Product</div>
					</a>
					<ul>
						<li> <a href="{{route('all.product')}}"><i class="bx bx-right-arrow-alt"></i>All Product</a>
						</li>
						<li> <a href="{{route('add.product')}}"><i class="bx bx-right-arrow-alt"></i>Add Product</a>
						</li>

					</ul>
				</li>

                <li>
					<a class="has-arrow" href="javascript:;">
						<div class="parent-icon"><i class='bx bx-message-square-edit'></i>
						</div>
						<div class="menu-title">Slider</div>
					</a>
					<ul>
						<li> <a href="{{route('all.slider')}}"><i class="bx bx-right-arrow-alt"></i>All Slider</a>
						</li>
						<li> <a href="{{route('add.slider')}}"><i class="bx bx-right-arrow-alt"></i>Add Slider</a>
						</li>

					</ul>
				</li>







			</ul>
			<!--end navigation-->
		</div>
</body>
</html>






