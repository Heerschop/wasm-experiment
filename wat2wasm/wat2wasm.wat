
(module
  (func (export "mul") (param $x i32) (param $y i32) (result i32)
    (i32.mul
      (local.get $x)
      (local.get $y)
    )
  )
)
