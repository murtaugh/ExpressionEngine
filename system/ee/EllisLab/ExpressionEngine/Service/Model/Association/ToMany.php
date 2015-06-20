<?php

namespace EllisLab\ExpressionEngine\Service\Model\Association;

use EllisLab\ExpressionEngine\Service\Model\Collection;

class ToMany extends Association {

	public function get()
	{
		$result = parent::get();

		if ( ! isset($result))
		{
			$this->ensureCollection();
			return $this->related;
		}

		return $result;
	}

	protected function ensureExists($model)
	{
		$this->ensureCollection();

		if ( ! $this->has($model))
		{
			$this->related->add($model);
			parent::ensureExists($model);
		}
	}

	protected function ensureDoesNotExist($model)
	{
		if ($this->has($model))
		{
			$this->related->remove($model);
			parent::ensureDoesNotExist($model);
		}
	}

	protected function has($model)
	{
		if (is_null($this->related))
		{
			return FALSE;
		}

		foreach ($this->related as $m)
		{
			if ($m === $model)
			{
				return TRUE;
			}
		}

		return FALSE;
	}

	protected function ensureCollection()
	{
		if (is_null($this->related))
		{
			$this->related = new Collection();
		}

		if ($this->related->getAssociation() !== $this)
		{
			$this->related->setAssociation($this);
		}
	}
}
