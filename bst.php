<?php
function dd()
{
    echo '<pre>';
    array_map(function ($x) {
        var_dump($x);
    }, func_get_args());
    die;
}

class Node
{
    public $data;
    public $right = null;
    public $left = null;
}

class BinaryTree
{
    public $root;
    public $current;
    public $previousNode;

    function __construct($node)
    {
        $this->root = $node;
    }

    public function addNode($current, $node)
    {
        if ($node->data >= $current->data) {
            if ($current->right == null) return $current->right = $node;
            return $this->addNode($current->right, $node);
        } else {
            if ($current->left == null) return $current->left = $node;
            return $this->addNode($current->left, $node);
        }
    }

    public function inOrderTreversal($node)
    {
        if($node==null) return;
        if ($node->left != null) $this->inOrderTreversal($node->left);
        print($node->data . " ");
        if ($node->right != null) $this->inOrderTreversal($node->right);
    }

    public function findNode($current, $node, $previous = null)
    {
        if ($node->data == $current->data) {
            return [
                'current_node' => $current,
                'previous' => $previous
            ];
        } else {

            if ($node->data > $current->data) {
                if ($current->right == null) return false;
                return $this->findNode($current->right, $node, $current);
            } else {
                if ($current->left == null) return false;
                return $this->findNode($current->left, $node, $current);
            }
        }
    }


    public function findSmallestNode($current, $previous = null)
    {
        if ($current == null) return null;
        if ($current->left == null) return [
            'smallest' => $current,
            'previous_smallest' => $previous
        ];
        return $this->findSmallestNode($current->left, $current);

    }

    public function deleteNode($root, $key, $previous = null)
    {
        if ($root == null) return false;
        if ($key < $root->data) {
            return $this->deleteNode($root->left, $key, $previous = $root);
        }
        // dd($root);
        if ($key > $root->data) {
            return $this->deleteNode($root->right, $key, $previous = $root);
        }
        if ($root->data == $key) {
            if ($root->left == null && $root->right != null) {
                if($previous==null) {
                    $this->root=$root->right;
                    //dd($this->root,$root);
                }
                elseif ($previous->data >= $root->right->data) {
                    $previous->left = $root->right;
                } else {
                    $previous->right = $root->right;
                }
            }
            if ($root->right == null && $root->left != null) {
                if($previous==null) {
                    $this->root=$root->left;
                }
                elseif ($previous->data >= $root->left->data) {
                    $previous->left = $root->left;
                } else {
                    $previous->right = $root->right;
                }
            }
            if ($root->right == null && $root->left == null) {
                if($previous==null) {
                    $this->root =null;

                }
                elseif ($root->data >= $previous->data) {
//                    dd($this->root);
                    $previous->right = null;
                } else {
                    $previous->left = null;
                }
            }
            if ($root->right != null && $root->left != null) {
                $min = $this->minValueNode($root->right, $root->right->data, $root);
                $root->data = $min->data;
                $this->deleteNode($root->right, $min->data, $root);
            }


        }
    }

    function minValueNode($node)
    {
        $current = $node;
        while ($current->left != null) {
            $current = $current->left;
        }
        return $current;
    }
}


$node1 = new Node();
$node1->data = 1;
$node2 = new Node();
$node2->data = 2;
$node7 = new Node();
$node7->data = 7;
$node10 = new Node();
$node10->data = 10;
$node0 = new Node();
$node0->data = 0;
$node6 = new Node();
$node6->data = 6;
$node4 = new Node();
$node4->data = 4;

$node5 = new Node();
$node5->data = 5;
$node8 = new Node();
$node8->data = 8;


$binarytree = new BinaryTree($node0);
$binarytree->addNode($binarytree->root, $node2);
//$binarytree->addNode($binarytree->root, $node2);
$binarytree->addNode($binarytree->root, $node7);
$binarytree->addNode($binarytree->root, $node6);
$binarytree->addNode($binarytree->root, $node4);
$binarytree->addNode($binarytree->root, $node5);
$binarytree->addNode($binarytree->root, $node8);
$binarytree->inOrderTreversal($binarytree->root);

////dd($binarytree->root);
//$delteNodes = [0];
//foreach ($delteNodes as $node) {
//    $binarytree->deleteNode($binarytree->root, $node);
//    echo '<br>';
//    $binarytree->inOrderTreversal($binarytree->root);
//}